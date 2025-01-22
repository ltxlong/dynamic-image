// 添加 CORS 头部的辅助函数
function addCorsHeaders(response) {
  const headers = new Headers(response.headers)
  headers.set('Access-Control-Allow-Origin', '*')
  headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  })
}

// 检查访问限制
async function checkAccessRestriction(request, db) {
  // 获取设置
  const settings = await db.get('settings', { type: 'json' }) || {}
  const accessUrls = settings.accessUrls || []
  
  // 如果没有设置访问限制，允许访问
  if (!accessUrls.length) {
    return null
  }
  
  // 获取请求的 referer
  const referer = request.headers.get('referer')
  if (!referer) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: '访问被拒绝' 
    }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    })
  }
  
  // 检查 referer 是否在允许列表中
  const refererUrl = new URL(referer)
  const isAllowed = accessUrls.some(allowedUrl => 
    refererUrl.hostname.endsWith(allowedUrl.toLowerCase())
  )
  
  if (!isAllowed) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: '访问被拒绝' 
    }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    })
  }
  
  return null
}

export async function onRequest(context) {
  const { env, request } = context
  const url = new URL(request.url)
  
  // 处理 OPTIONS 请求
  if (request.method === 'OPTIONS') {
    return addCorsHeaders(new Response(null, { status: 204 }))
  }

  // 检查是否使用 KV 数据库
  const useKV = !!env.DYNAMIC_IMAGE
  const db = useKV ? env.DYNAMIC_IMAGE : await connectToDatabase(env.DATABASE_URL)
  
  // API 路由处理
  if (url.pathname === '/api') {
    // 检查访问限制
    const accessResponse = await checkAccessRestriction(request, db)
    if (accessResponse) return addCorsHeaders(accessResponse)
    
    return addCorsHeaders(await handleGetLink(db, useKV))
  }
  
  if (url.pathname === '/api/auth') {
    return addCorsHeaders(await handleAuth(request, env.ADMIN_PASSWORD, db))
  }
  
  if (url.pathname === '/api/settings') {
    const authResponse = await checkAuth(request, db)
    if (authResponse) return addCorsHeaders(authResponse)
    
    if (request.method === 'POST') {
      return addCorsHeaders(await handleUpdateSettings(request, db, useKV))
    }
    if (request.method === 'GET') {
      return addCorsHeaders(await handleGetSettings(db, useKV))
    }
  }
  
  if (url.pathname === '/api/links') {
    if (request.method === 'GET') {
      return addCorsHeaders(await handleGetLinks(db, useKV))
    }
    if (request.method === 'POST') {
      const authResponse = await checkAuth(request, db)
      if (authResponse) return addCorsHeaders(authResponse)
      return addCorsHeaders(await handleAddLink(request, db, useKV))
    }
  }
  
  if (url.pathname.startsWith('/api/links/')) {
    const authResponse = await checkAuth(request, db)
    if (authResponse) return addCorsHeaders(authResponse)
    
    const id = url.pathname.split('/').pop()
    if (request.method === 'DELETE') {
      return addCorsHeaders(await handleDeleteLink(id, db, useKV))
    }
    if (request.method === 'PUT') {
      return addCorsHeaders(await handleUpdateLink(id, request, db, useKV))
    }
  }
  
  return addCorsHeaders(new Response('Not Found', { status: 404 }))
}

async function handleAuth(request, adminPassword, db) {
  try {
    const { password } = await request.json()
    
    if (password === adminPassword) {
      // 生成新的token (使用 UUID v4)
      const token = crypto.randomUUID()
      
      // 保存token
      await db.put('token', token)
      
      return new Response(JSON.stringify({ success: true, token: token }), {
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: '密码错误' 
    }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: '请求格式错误' 
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

async function handleAddLink(request, db, useKV) {
  try {
    const link = await request.json()
    
    if (useKV) {
      link.id = Date.now().toString()
      // 将单个链接存储为独立的 KV
      await db.put(`link:${link.id}`, JSON.stringify(link))
      
      // 维护一个链接 ID 列表
      let linkIds = await db.get('linkIds', { type: 'json' }) || []
      linkIds.push(link.id)
      await db.put('linkIds', JSON.stringify(linkIds))
      
      return new Response(JSON.stringify(link), {
        headers: { 'Content-Type': 'application/json' }
      })
    } else {
      // 外部数据库实现
      // ...
    }
  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: '添加链接失败' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

async function handleDeleteLink(id, db, useKV) {
  try {
    if (useKV) {
      // 删除单个链接
      await db.delete(`link:${id}`)
      
      // 更新链接 ID 列表
      let linkIds = await db.get('linkIds', { type: 'json' }) || []
      linkIds = linkIds.filter(linkId => linkId !== id)
      await db.put('linkIds', JSON.stringify(linkIds))
      
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' }
      })
    } else {
      // 外部数据库实现
      // ...
    }
  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: '删除链接失败' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

async function checkAuth(request, db) {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: '未登录' 
    }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const token = authHeader.split(' ')[1]
  const savedToken = await db.get('token')
  
  if (token !== savedToken) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'token无效' 
    }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// 获取图片内容
async function fetchImage(url) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      console.error('获取图片失败:', response.status, response.statusText)
      return null
    }

    // 保持原始响应，只修改缓存头部
    const headers = new Headers(response.headers)
    headers.set('cache-control', 'public, max-age=86400') // 24小时缓存
    
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    })
  } catch (error) {
    console.error('获取图片失败:', error)
    return null
  }
}

async function handleGetLink(db, useKV) {
  try {
    if (useKV) {
      // 获取所有链接 ID
      const linkIds = await db.get('linkIds', { type: 'json' }) || []
      
      // 获取所有链接详情
      const links = await Promise.all(
        linkIds.map(async id => {
          const linkData = await db.get(`link:${id}`, { type: 'json' })
          return linkData
        })
      )
      
      // 获取设置
      const settings = await db.get('settings', { type: 'json' }) || { 
        displayMode: 1,
        accessUrls: []
      }

      // 选择链接
      const selectedUrl = selectLink(links.filter(Boolean), settings)
      if (!selectedUrl) {
        return new Response('', { status: 404 })
      }

      // 返回 302 重定向
      return new Response(null, {
        status: 302,
        headers: {
          'Location': selectedUrl,
          'Cache-Control': 'no-cache'
        }
      })
    } else {
      // 外部数据库实现...
      const links = await db.query('SELECT * FROM links')
      const settings = await db.query('SELECT * FROM settings LIMIT 1')
      const selectedUrl = selectLink(links, settings[0])
      if (!selectedUrl) {
        return new Response('', { status: 404 })
      }

      // 返回 302 重定向
      return new Response(null, {
        status: 302,
        headers: {
          'Location': selectedUrl,
          'Cache-Control': 'no-cache'
        }
      })
    }
  } catch (error) {
    return new Response('获取链接失败', { status: 500 })
  }
}

function selectLink(links, settings) {
  if (!links || !links.length) return ''
  
  // 只选择激活状态的链接
  let filteredLinks = links.filter(link => link.active)
  if (!filteredLinks.length) return ''
  console.log('displaymode: ', settings.displayMode)
  // 如果是随机模式或没有设置模式，直接随机返回
  if (!settings.displayMode || settings.displayMode === 1) {
    return getRandomLink(filteredLinks)
  }

  // 标签模式
  if (settings.displayMode === 2) {
    const now = new Date()
    let selectedLinks = []

    // 1. 先查找日标签
    selectedLinks = getDayLinks(filteredLinks, now)
    console.log('日标签: ', selectedLinks)
    if (selectedLinks.length) {
      return getRandomLink(selectedLinks)
    }

    // 2. 查找周标签
    selectedLinks = getWeekLinks(filteredLinks, now)
    console.log('周标签: ', selectedLinks)
    if (selectedLinks.length) {
      return getRandomLink(selectedLinks)
    }

    // 3. 查找月标签
    selectedLinks = getMonthLinks(filteredLinks, now)
    console.log('月标签: ', selectedLinks)
    if (selectedLinks.length) {
      return getRandomLink(selectedLinks)
    }

    // 4. 如果都没有匹配的标签，返回随机链接
    return getRandomLink(filteredLinks)
  }
}

// 获取日标签匹配的链接
function getDayLinks(links, now) {
  const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const timestamp = currentDate.getTime()

  return links.filter(link => {
    if (!link.holidayTag) return false
    // 如果holidayTag是数组（包含年份），直接比较时间戳
    if (Array.isArray(link.holidayTag)) {
      if (link.holidayTag.length !== 2) return false
      const startDate = new Date(link.holidayTag[0])
      const endDate = new Date(link.holidayTag[1])
      return timestamp >= startDate.getTime() && timestamp <= endDate.getTime()
    }
    // 向后兼容：如果是单个日期，保持原有逻辑
    const tagDate = new Date(link.holidayTag)
    const linkDate = new Date(now.getFullYear(), tagDate.getMonth(), tagDate.getDate())
    return linkDate.getTime() === timestamp
  })
}

// 获取周标签匹配的链接
function getWeekLinks(links, now) {
  const weekDay = now.getDay()
  console.log('获取weekday: ', weekDay);
  return links.filter(link => 
    Array.isArray(link.weekTags) && link.weekTags.includes(weekDay)
  )
}

// 获取月标签匹配的链接
function getMonthLinks(links, now) {
  const month = now.getMonth() + 1
  console.log('获取month: ', month);
  return links.filter(link => link.monthTag === month)
}

// 从链接数组中随机选择一个链接
function getRandomLink(links) {
  if (!links.length) return ''
  return links[Math.floor(Math.random() * links.length)].url
}

async function handleGetLinks(db, useKV) {
  try {
    if (useKV) {
      // 获取所有链接 ID
      const linkIds = await db.get('linkIds', { type: 'json' }) || []
      
      // 获取所有链接详情
      const links = await Promise.all(
        linkIds.map(async id => {
          const linkData = await db.get(`link:${id}`, { type: 'json' })
          return linkData
        })
      )
      
      return new Response(JSON.stringify(links.filter(Boolean)), {
        headers: { 'Content-Type': 'application/json' }
      })
    } else {
      // 外部数据库实现
      const links = await db.query('SELECT * FROM links')
      return new Response(JSON.stringify(links), {
        headers: { 'Content-Type': 'application/json' }
      })
    }
  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: '获取链接列表失败' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

async function handleUpdateLink(id, request, db, useKV) {
  try {
    const link = await request.json()
    
    if (useKV) {
      await db.put(`link:${id}`, JSON.stringify(link))
      return new Response(JSON.stringify(link), {
        headers: { 'Content-Type': 'application/json' }
      })
    } else {
      // 外部数据库实现...
    }
  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: '更新链接失败' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

async function handleUpdateSettings(request, db, useKV) {
  try {
    const data = await request.json()
    let settings = await db.get('settings', { type: 'json' }) || {}
    
    // 更新显示模式
    if (data.displayMode !== undefined) {
      settings.displayMode = data.displayMode
    }
    
    // 更新访问限制URL
    if (data.accessUrls !== undefined) {
      settings.accessUrls = data.accessUrls
    }
    
    await db.put('settings', JSON.stringify(settings))
    
    return new Response(JSON.stringify({ 
      success: true,
      settings
    }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: '更新设置失败' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

async function handleGetSettings(db, useKV) {
  try {
    const settings = await db.get('settings', { type: 'json' }) || {
      displayMode: 1,
      accessUrls: []
    }
    
    return new Response(JSON.stringify(settings), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: '获取设置失败' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
} 
