# 주식 포트폴리오 웹 서비스
URL => https://my-portfolio.run.goorm.io/

# back front 서로 맞춰야할 것
1. stock음수 값 받는거 수정 back
2. user create할때 column 값 제한된값받도록 수정 back
3. 포트폴리오 create하고 차트 부분이 초기화되도록 수정
4. hint 단위 % 때에 따라 바뀌도록 수정

# 해야할것

1. signup 뒤로가기 제어
2. 배당캘린더
* etf api 가져오는게 문제.. 
etf가져오는 곳 정함

# 나중에 해야할것
1. popover message
2. MyInfo 만들기

# 구름 ide 항상켜두기
springboot => nohup
(ps -ef  /  kill -9 PID)
react => pm2
( pm2 --name [작업명] start npm -- start  /  pm2 ps  /  pm2 delete [작업명] )