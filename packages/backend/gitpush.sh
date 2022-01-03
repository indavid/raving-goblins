dt=$(date '+%d/%m/%Y %H:%M:%S'); 

#heroku login // to log it to your heroku account
#git init     // init the project 
#heroku git:remote -a ravinggoblings // change it to your heroku app name


# push everything

git add .
git commit -am "$dt"
git push heroku master