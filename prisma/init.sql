-- 创建数据库
CREATE DATABASE IF NOT EXISTS nuxt_demo;
USE nuxt_demo;

-- 创建设备表
CREATE TABLE IF NOT EXISTS t_device (
    id INT AUTO_INCREMENT PRIMARY KEY,
    device_name VARCHAR(255) NOT NULL,
    remarks VARCHAR(255),
    ctime DATETIME,
    number VARCHAR(255)
);

-- 创建错误消息表
CREATE TABLE IF NOT EXISTS t_error_msg (
    id INT AUTO_INCREMENT PRIMARY KEY,
    d_no VARCHAR(16),
    c_time DATETIME,
    e_msg VARCHAR(255),
    e_no VARCHAR(255),
    type VARCHAR(4)
);

-- 插入测试数据
INSERT INTO t_device (device_name, number, remarks, ctime) VALUES
('测试设备1', 'DEV001', '这是测试设备1的备注', NOW()),
('测试设备2', 'DEV002', '这是测试设备2的备注', NOW()),
('测试设备3', 'DEV003', '这是测试设备3的备注', NOW()),
('测试设备4', 'DEV004', '这是测试设备4的备注', NOW()),
('测试设备5', 'DEV005', '这是测试设备5的备注', NOW());

-- 插入错误消息数据
INSERT INTO t_error_msg (d_no, c_time, e_msg, e_no, type) VALUES
('DEV001', NOW(), '设备温度过高', 'ERR001', '1'),
('DEV001', NOW(), '设备连接断开', 'ERR002', '2'),
('DEV002', NOW(), '设备压力异常', 'ERR003', '1'),
('DEV002', NOW(), '设备响应超时', 'ERR004', '2'),
('DEV003', NOW(), '设备电量不足', 'ERR005', '1'); 