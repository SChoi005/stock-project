# 주식 포트폴리오 웹 서비스
URL => https://my-portfolio.run.goorm.io/

# back front 서로 맞춰야할 것
1. stock음수 값 받는거 수정 back
2. user create할때 column 값 제한된값받도록 수정 back

# 해야할것
1. signup 뒤로가기 제어
2. 차트, 배당캘린더
* etf api 가져오는게 문제.. 


# 나중에 해야할것
1. popover message
2. MyInfo 만들기
3. 포트폴리오 누르고 정보올때까지는 다른포트폴리오 선택 못하도록 하기
4. stock 추가 삭제할때 chart 업데이트하기 

# 구름 ide 항상켜두기
springboot => nohup
(ps -ef  /  kill -9 PID)
react => pm2
( pm2 --name [작업명] start npm -- start  /  pm2 ps  /  pm2 delete [작업명] )