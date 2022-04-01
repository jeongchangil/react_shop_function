ui 보다는 기능에 초점을 둔 쇼핑몰입니다.
inflearn 강의를 보며 이해하며 짠 코드 입니다.

기능
1. 로그인/회원가입 => DB는 몽고디비를 사용했고 jwt를 사용하여 로그인을 구현했습니다.
2. 상품등록        => 이미지는 multer 라이브러리 나머지 정보는 rest api를 사용하여 구현했습니다.
3. 상품 검색필터   => 클라이언트에서 서버로 데이터를 넘겨주면 디비에서 검색하여 구현했습니다.
4. 장바구니        => 쿠키가 아닌 몽고디비 유저콜렉션에 저장하고 삭제하는 방식으로 구현했습니다.
5. 주문히스토리    => 장바구니와 비슷하게 유저콜렉션에 저장합니다.
6. 결제            => paypal을 사용하여 테스트 결제만 구현했습니다.
