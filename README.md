# PIM prototype

Prototype độc lập cho SKU, thuộc tính, nội dung và mapping theo shop.

## Chạy để test

```powershell
cd backend
npm run dev
```

Mở terminal khác:

```powershell
cd frontend
npm run dev
```

Frontend dùng `http://localhost:3001` mặc định. Product List sẽ đọc từ JSON Server; khi API chưa chạy, giao diện vẫn hiển thị seed data.

## Luồng test PIM

- `CREATE` tạo product draft vào `/products` và chặn SKU trùng.
- Product Detail → `Attributes` lưu Product Data, kiểm tra GTIN, trọng lượng, kích thước và biên giá sau phí/voucher.
- Product Detail → `Attributes` có Lifecycle status; chọn `APPROVED` để đưa sản phẩm qua export gate.
- Product Detail → `Channel mapping` tạo mapping mới và chặn mapping `ACTIVE` trùng channel/shop/variant.
- Rail → `Imports` → `Import batches`: chọn CSV, xem preview, sau đó import. Dòng không hợp lệ tạo exception; SKU đã tồn tại được cập nhật, SKU mới được tạo.
- CSV cần các cột `sku,name,family`. Các cột tùy chọn: `brandCode,gtin,netWeight,grossWeight,cost,salePrice,sellerFeeRate,voucherFunding`.
- Có file sẵn để test: `samples/pim-import-demo.csv` (1 dòng hợp lệ, 1 dòng tạo exception).
- Rail → `Imports` → `Exceptions`: Resolve/Ignore để lưu quyết định vào audit log.
- Rail → `Imports` → `Channel exports`: export chỉ hoạt động khi có product `APPROVED`, GTIN, package data (cân nặng/kích thước), giá hợp lệ và mapping `ACTIVE` trên channel được chọn. Kết quả tải về CSV và lưu export evidence.
- Rail → `Imports` → `Reports`: hiển thị số liệu tính trực tiếp từ dữ liệu API.
