-- 插入设备数据
INSERT INTO t_device (device_name, number, remarks, ctime) VALUES
('测试设备1', 'DEV001', '这是测试设备1的备注', NOW()),
('测试设备2', 'DEV002', '这是测试设备2的备注', NOW()),
('测试设备3', 'DEV003', '这是测试设备3的备注', NOW()),
('测试设备4', 'DEV004', '这是测试设备4的备注', NOW()),
('测试设备5', 'DEV005', '这是测试设备5的备注', NOW()),
('测试设备6', 'DEV006', '这是测试设备6的备注', NOW()),
('测试设备7', 'DEV007', '这是测试设备7的备注', NOW()),
('测试设备8', 'DEV008', '这是测试设备8的备注', NOW()),
('测试设备9', 'DEV009', '这是测试设备9的备注', NOW()),
('测试设备10', 'DEV010', '这是测试设备10的备注', NOW());

-- 插入错误消息数据
INSERT INTO t_error_msg (d_no, c_time, e_msg, e_no, type) VALUES
('DEV001', NOW(), '设备温度过高', 'ERR001', '1'),
('DEV001', NOW(), '设备连接断开', 'ERR002', '2'),
('DEV002', NOW(), '设备压力异常', 'ERR003', '1'),
('DEV002', NOW(), '设备响应超时', 'ERR004', '2'),
('DEV003', NOW(), '设备电量不足', 'ERR005', '1'),
('DEV003', NOW(), '设备通信失败', 'ERR006', '2'),
('DEV004', NOW(), '设备离线', 'ERR007', '2'),
('DEV005', NOW(), '设备参数异常', 'ERR008', '1'),
('DEV006', NOW(), '设备重启', 'ERR009', '2'),
('DEV007', NOW(), '设备过载', 'ERR010', '1'); 