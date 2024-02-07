End-User:

-   Check thấy ví mới hoặc chưa stake vào VILAI pool --> soạn giao dịch để stake vào VILAI POOL => OK

-   Check xem ủy thác vào VILAI được 4 epoch chưa? đủ => phát voucher (lựa chọn một voucher chưa dùng, đường link mua hàng=> thông báo cho người dùng, mark luôn voucher đã được gán cho ví nào) => OK
-   Thiếu => Thông báo đợi

-   Trang webs, tokenomic, đội nhóm, roadmap => OK

Admin:

-   Cung cấp Voucher vào danh sách voucher,
-   Cho phép người bán hàng chuyển token nền tảng C2E vào ví người mua hàng (số lượng là bao nhiêu + địa chỉ ví là gì)
-   Import theo lô (cvs: số lượng token cần chuyển + địa chỉ ví)
-   Quản lý vouchers (dùng bao nhiêu, còn bao nhiêu, danh sách)

###############################################################################################################################################################

##### END USER

# Tự động check VLAI POOL => OKE

-   Check xem ủy thác vào VILAI được 4 epoch chưa => OK
    -   Đủ: phát voucher (lựa chọn một voucher chưa dùng, đường link mua hàng=> thông báo cho người dùng, mark luôn voucher đã được gán cho ví nào) => OK
    -   Thiếu: Thông báo đợi

# Trang webs, tokenomic, đội nhóm, roadmap => OK

##### ADMIN

# Cung cấp Voucher vào danh sách voucher,

-   Cho phép người bán hàng chuyển token nền tảng C2E vào ví người mua hàng (số lượng là bao nhiêu + địa chỉ ví là gì)
-   Import theo lô (cvs: số lượng token cần chuyển + địa chỉ ví)
-   Quản lý vouchers (dùng bao nhiêu, còn bao nhiêu, danh sách)

#########################################################

server {
listen 80;
server_name api.demarket.vn;

    location / {
      proxy_pass http://localhost:5000;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
    }

}

server {
listen 443 ssl;
server_name api.demarket.vn;

    ssl_certificate /etc/ssl/cloudflare/demarketvn/cert.pem;
    ssl_certificate_key /etc/ssl/cloudflare/demarketvn/key.pem;
    ssl_client_certificate /etc/ssl/cloudflare/demarketvn/cloudflare.crt;
    ssl_verify_client on;

    location / {
      proxy_pass http://localhost:5000;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
    }

}
