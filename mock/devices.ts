import type { Device } from '~/types/device'

export const mockDevices: Device[] = [
  {
    id: 'DEV001',
    name: '测试设备1',
    status: 'online',
    lastOnline: '2024-03-20 10:30:00',
    onlineTimeRange: {
      start: '2024-03-20 08:00:00',
      end: '2024-03-20 10:30:00'
    },
    createdAt: '2024-03-01 08:00:00',
    updatedAt: '2024-03-20 10:30:00'
  },
  {
    id: 'DEV002',
    name: '测试设备2',
    status: 'offline',
    lastOnline: '2024-03-19 15:45:00',
    onlineTimeRange: {
      start: '2024-03-19 09:00:00',
      end: '2024-03-19 15:45:00'
    },
    createdAt: '2024-03-02 09:00:00',
    updatedAt: '2024-03-19 15:45:00'
  },
  {
    id: 'DEV003',
    name: '测试设备3',
    status: 'online',
    lastOnline: '2024-03-20 11:20:00',
    onlineTimeRange: {
      start: '2024-03-20 09:30:00',
      end: '2024-03-20 11:20:00'
    },
    createdAt: '2024-03-03 10:00:00',
    updatedAt: '2024-03-20 11:20:00'
  }
] 