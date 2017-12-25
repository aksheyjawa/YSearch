
How to's
========

https://daveceddia.com/create-react-app-express-backend/
https://daveceddia.com/create-react-app-express-production/
https://daveceddia.com/where-fetch-data-componentwillmount-vs-componentdidmount/


Architecture:
============
+ graphql + express + mongo


   install dependencies:
     $ cd express_backend && npm install

   run the app:
     $ DEBUG=express-backend:* npm start


Mongodb
=======
http://tutorialtous.com/mongodb/mongodbvssql.php
https://docs.mongodb.com/manual/reference/sql-comparison/

https://docs.mongodb.com/getting-started/shell/query/

https://www.mongodb.com/blog/post/the-modern-application-stack-part-3-building-a-rest-api-using-expressjs

mongoimport --jsonArray --db srfyssdata --collection locations --file yssdata.json

mlab
----
on web: https://mlab.com/databases/yl-mongo
database: yl-mongo (same)
collection: locations (same)

> To connect using the mongo shell
mongo ds141185.mlab.com:41185/yl-mongo -u aksheyjawa -p qwerty123#

> To connect using a driver via the standard MongoDB URI (what's this?)
mongodb://<dbuser>:<dbpassword>@ds141185.mlab.com:41185/yl-mongo

> JSON Import collection
mongoimport --jsonArray -h ds141185.mlab.com:41185 -d yl-mongo -c locations -u aksheyjawa -p qwerty123# --file yssdata.json

> JSON Export collection
mongoexport -h ds141185.mlab.com:41185 -d yl-mongo -c <collection> -u <user> -p <password> -o <output file>
