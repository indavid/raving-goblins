dt=$(date '+%d/%m/%Y %H:%M:%S'); 

git add .
git commit -m "$dt"
git push origin master


#heroku login
#git add .
#git commit -am "$dt"
#git push heroku master