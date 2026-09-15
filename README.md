# Assignment 01: Todo App

## Student Information

- **Họ và tên**: Vũ Hải Đăng
- **Mã số sinh viên (MSSV)**: 1923050167
- **Môn học**: Lập trình ứng dụng di động (Mobile Application Development)
- **Framework**: React Native (Expo)
- **GitHub Repository**: https://github.com/HACSHG/Assignment_01_TodoApp_1923050167
- **Expo Snack Online**: https://snack.expo.dev/nTTCaWx7Xlymj7UwzMuGv

---

## 📋 Bảng Tóm Tắt Đáp Ứng Yêu Cầu (Requirements Checklist)

| Yêu cầu | Trạng thái | Mô tả chi tiết & Vị trí code |
| :--- | :---: | :--- |
| **1. Thêm Todo** | ✅ Hoàn thành | Nhập text + bấm nút "+ Thêm". Tự động xóa input (`clearInput`) sau khi thêm. Có kiểm tra chuỗi rỗng. ([TodoInput.tsx](components/TodoInput.tsx)) |
| **2. Hiển thị danh sách** | ✅ Hoàn thành | Sử dụng `ScrollView` hiển thị danh sách dạng thẻ Card, phân chia rõ ràng mục "Cần làm" và "Đã hoàn thành". ([TodoList.tsx](components/TodoList.tsx)) |
| **3. Đánh dấu hoàn thành** | ✅ Hoàn thành | Bấm vào checkbox chuyển đổi trạng thái: đổi màu thẻ, gạch ngang chữ (`textDecorationLine: 'line-through'`), hiện dấu tick `✓`. ([TodoItem.tsx](components/TodoItem.tsx)) |
| **4. Xóa Todo** | ✅ Hoàn thành | Nút xóa `✕` màu đỏ trên từng thẻ, xóa ngay lập tức khỏi mảng state `todos`. ([TodoItem.tsx](components/TodoItem.tsx)) |
| **5. Hook useState** | ✅ Hoàn thành | Sử dụng `useState` cho `todos` (id, text, completed, priority, category, createdAt), `searchQuery`, và `currentFilter`. ([App.tsx](App.tsx)) |
| **6. Layout Flexbox** | ✅ Hoàn thành | Bố cục toàn diện bằng Flexbox: `flexDirection: 'row' / 'column'`, `justifyContent`, `alignItems`, `flex: 1`. Header + Input + Filter + List + Footer. |
| **7. Tích hợp STUDENT_ID** | ✅ Hoàn thành | Khai báo `const STUDENT_ID = "1923050167";` ở đầu code và tham chiếu tại hơn 6 vị trí khác nhau. |
| **8. Custom Components** | ✅ Hoàn thành | Tách 6 component riêng biệt: `TodoHeader`, `TodoInput`, `TodoItem`, `TodoList`, `TodoFilter`, `TodoFooter`. |
| **9. Custom: Color Theme** | ✅ Hoàn thành | **Dark/Blue**: Tính toán màu chủ đạo từ chữ số MSSV (`hsl(222, 85%, 58%)` xanh dương điện quang trên nền tối `#0a0f1d`). |
| **10. Custom: Feature** | ✅ Hoàn thành | **Priority levels** (Cao, Vừa, Thấp) + **Categories** (Assignment, Study, Work, Personal) + **Bộ đếm Counter** + **Tìm kiếm Search**. |
| **11. Custom: UI Style** | ✅ Hoàn thành | Giao diện **Cards với checkboxes** + **Khu vực Done riêng biệt** (Active & Done sections). |

---

## 🎯 Chi Tiết Tích Hợp STUDENT_ID (Bắt Buộc - Ít Nhất 5 Vị Trí)

Hằng số định danh sinh viên:
```typescript
export const STUDENT_ID = "1923050167";
export const STUDENT_NAME = "Vũ Hải Đăng";
```

Các vị trí sử dụng `STUDENT_ID` trong ứng dụng:

1. **Vị trí 1 (Khai báo hằng số đầu file `App.tsx` & `student.ts`)**:
   - `const STUDENT_ID = "1923050167";` không bị sửa đổi hay ghi đè.
2. **Vị trí 2 (Hiển thị tại Header & Huy hiệu sinh viên)**:
   - Hiển thị trực tiếp: `<Text>MSSV: {STUDENT_ID}</Text>` trong [TodoHeader.tsx](components/TodoHeader.tsx).
   - Mã huy hiệu sinh viên: `formatStudentBadge(STUDENT_ID)` -> `STU-0167`.
3. **Vị trí 3 (Hiển thị tại Footer của ứng dụng)**:
   - `<Text>Vũ Hải Đăng • MSSV: {STUDENT_ID}</Text>` trong [TodoFooter.tsx](components/TodoFooter.tsx).
4. **Vị trí 4 (Tính toán bảng màu Dark/Blue theo các chữ số MSSV)**:
   - Lấy 3 chữ số đầu `192` tính Hue nền xanh: `(192 % 35) + 215 = 222°` (Deep Royal / Electric Blue).
   - Lấy 2 chữ số cuối `67` tính màu nhấn Cyan: `(67 % 40) + 180 = 207°`.
   - Hàm `deriveThemeColors(STUDENT_ID)` trong [constants/student.ts](constants/student.ts).
5. **Vị trí 5 (Tính toán kích thước Dynamic Spacing / Padding / Border Radius theo MSSV)**:
   - Độ bo góc Card: `lastDigit + 7 = 7 + 7 = 14px`.
   - Padding màn hình: `idLength + 6 = 10 + 6 = 16px`.
   - Hàm `deriveSpacingFromId(STUDENT_ID)` trong [constants/student.ts](constants/student.ts).
6. **Vị trí 6 (Sinh ID duy nhất cho mỗi Todo theo MSSV)**:
   - `generateTodoId(STUDENT_ID)`: Mỗi công việc được tạo ra có ID mang tiền tố `${STUDENT_ID}-${Date.now()}` trong [App.tsx](App.tsx).
7. **Vị trí 7 (Dữ liệu khởi tạo mẫu - Seed Data)**:
   - `getInitialTodos(STUDENT_ID)` khởi tạo các công việc gắn liền với mã số sinh viên `1923050167`.

---

## 🏗️ Cấu Trúc Thư Mục (Folder Structure)

```
Assignment 1/
├── App.tsx                     # Component chính, quản lý state useState, bố cục Flexbox
├── index.ts                    # Điểm khởi chạy của ứng dụng Expo
├── app.json                    # Cấu hình ứng dụng Expo (tên, màu nền, orientation)
├── package.json                # Danh sách dependencies (react, react-native, expo)
├── tsconfig.json               # Cấu hình TypeScript chuẩn Expo
├── types.ts                    # Định nghĩa kiểu dữ liệu Todo, Priority, Category, FilterStatus
├── README.md                   # Báo cáo đồ án, thông tin sinh viên và hướng dẫn chấm bài
├── constants/
│   └── student.ts              # Khai báo STUDENT_ID, STUDENT_NAME, thuật toán tạo theme & spacing
└── components/
    ├── TodoHeader.tsx          # Header hiển thị tên SV, MSSV, thanh tiến độ và bộ đếm
    ├── TodoInput.tsx           # Ô nhập công việc, chọn mức ưu tiên, danh mục, nút thêm
    ├── TodoFilter.tsx          # Thanh tìm kiếm từ khóa và các tab lọc (Tất cả / Đang làm / Đã xong)
    ├── TodoItem.tsx            # Thẻ Card công việc với checkbox, gạch chữ khi xong, nút xóa
    ├── TodoList.tsx            # ScrollView hiển thị danh sách chia 2 phần (Cần làm / Đã xong)
    └── TodoFooter.tsx          # Footer hiển thị bản quyền, MSSV và số lượng việc còn lại
```

---

## 🚀 Hướng Dẫn Chạy Ứng Dụng (How to Run)

### Cách 1: Chạy trực tiếp trong thư mục `Assignment 1`
```bash
cd "d:/test-layout/Assignment 1"
npx expo start --web
# hoặc chạy trên thiết bị:
# npx expo start --android
# npx expo start --ios
```

### Cách 2: Chạy thông qua project `package`
```bash
cd "d:/test-layout/package"
npm run web
```
