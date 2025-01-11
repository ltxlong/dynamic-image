import { defineStore } from 'pinia'

export const useLinkStore = defineStore('links', {
  state: () => ({
    links: [],
    displayMode: 1, // 1: 随机, 2: 标签
  }),
  
  actions: {
    getAuthHeaders() {
      const token = sessionStorage.getItem('token')
      return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      }
    },

    async fetchLinks() {
      const response = await fetch('/api/links')
      if (response.ok) {
        this.links = await response.json()
      }
    },

    async addLink(link) {
      const response = await fetch('/api/links', {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(link)
      })
      if (response.ok) {
        const newLink = await response.json()
        this.links.push(newLink)
      } else {
        throw new Error('添加链接失败')
      }
    },
    
    async deleteLink(id) {
      const response = await fetch(`/api/links/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders()
      })
      if (response.ok) {
        this.links = this.links.filter(link => link.id !== id)
      } else {
        throw new Error('删除链接失败')
      }
    },
    
    async fetchSettings() {
      const response = await fetch('/api/settings', {
        headers: this.getAuthHeaders()
      })
      if (response.ok) {
        const settings = await response.json()
        this.displayMode = settings.displayMode
      }
    },

    async updateDisplayMode(mode) {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ displayMode: mode })
      })
      if (response.ok) {
        this.displayMode = mode
      } else {
        throw new Error('更新显示模式失败')
      }
    },

    async updateLink(link) {
      const response = await fetch(`/api/links/${link.id}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(link)
      })
      if (response.ok) {
        const index = this.links.findIndex(l => l.id === link.id)
        if (index !== -1) {
          this.links[index] = link
        }
      } else {
        throw new Error('更新链接失败')
      }
    },

    async toggleStatus(id) {
      const link = this.links.find(l => l.id === id)
      if (!link) throw new Error('链接不存在')

      const updatedLink = { 
        ...link, 
        active: !link.active
      }
      
      const response = await fetch(`/api/links/${id}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(updatedLink)
      })
      
      if (response.ok) {
        const index = this.links.findIndex(l => l.id === id)
        if (index !== -1) {
          this.links[index] = updatedLink
        }
      } else {
        throw new Error('更新状态失败')
      }
    }
  }
}) 
