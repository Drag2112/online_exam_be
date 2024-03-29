-- Khởi tạo data bảng roles
insert into roles (role_id, role_name, description, is_deleted)
values 
	(1, 'ADMIN', 'Admin hệ thống', 0),
	(2, 'TEACHER', 'Giáo viên', 0),
	(3, 'STUDENT', 'Học viên', 0);


-- Khởi tạo data bảng app_function
insert into app_function (function_id, function_code, description, is_deleted)
values
	(1, 'view_dashboard_tab', 'Xem Tab Dashboard và thực hiện các action trên Tab Dashboard nếu không có phân quyền cụ thể cho từng action', 0)
	(2, 'view_class_tab', 'Xem Tab Danh sách lớp học và thực hiện các action trên Tab Danh sách lớp học nếu không có phân quyền cụ thể cho từng action', 0),
	(3, 'view_admin_tab', 'Xem Tab Quản trị và thực hiện các action trên Tab Quản trị nếu không có phân quyền cụ thể cho từng action', 0),
	(4, 'create_class', 'Tạo lớp học mới ở Tab Danh sách lớp học', 0),
	(5, 'join_class', 'Tham gia 1 lớp học ở Tab Danh sách lớp học', 0),
	(6, 'view_class_detail', 'Xem màn hình Chi tiết lớp học và thực hiện các action trên màn hình Chi tiết lớp học nếu không có phân quyền cụ thể cho từng action', 0),
	(7, 'view_list_exam_created', 'Xem danh sách bài thi đã tạo và thực hiện các action trên danh sách đó nếu không có phân quyền cụ thể cho từng action', 0),
	(8, 'view_list_exam_need_done', 'Xem danh sách bài thi cần hoàn thành và thực hiện các action trên danh sách đó nếu không có phân quyền cụ thể cho từng action', 0),
	(9, 'view_all_exam_result', 'Xem kết quả các bài thi của các học viên', 0),
	(10, 'add_document', 'Thêm tài liệu cho lớp học', 0);


-- Khởi tạo data bảng role_app_function
insert into role_app_function (role_id, function_id)
values 
	(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9), (1, 10),
	(2, 1), (2, 2), (2, 4), (2, 5), (2, 6), (2, 7), (2, 9), (2, 10),
	(3, 1), (3, 2), (3, 5), (3, 6), (3, 8);