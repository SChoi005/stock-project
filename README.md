* Project name : stock-project *

=> 주식 포트폴리오 웹 서비스

& github 사용법
https://chancoding.tistory.com/76

https://shinsunyoung.tistory.com/78
-> spring security
-> 로그인, 회원가입

### Client ( React.js ) ###
1. 로그인, 회원가입 화면 UI, 이후 렌더링 페이지 
2. 메인 화면 UI 틀 만들기
3. 등락비율 나타내기
4. modal
5. BootStrap 입히기

### Server ( Springboot ) ###

1. 로그인 회원가입 만들기 -> user crud
2. 포트폴리오 db 작성 -> portfolio crud
3. 주식 db 작성 -> stock crud 작성
4. google openApi 주식 정보 가져오기

# 해야할것
==> ( 1차 휴식기 ! ) ( stock delete할때 확인작업 추가 )
1. stock 음수 validation
2. react-spinners barloader적용
3. component 2 제작
* etf api 가져오는게 문제.. (아 이거 좀 개에반디)

==> 이거 다하고 며칠 쉽시당 ~!~!~!~!~! ( 2차 휴식기 ! )

# 나중에 해야할것
1. stock delete할때 확인작업 추가
2. popover message
4. component 3 제작
5. component 4 제작
6. MyInfo 만들기
# 구름 ide 항상켜두기
springboot => nohup
(ps -ef  /  kill -9 PID)
react => pm2
( pm2 --name [작업명] start npm -- start  /  pm2 ps  /  pm2 delete [작업명] )
