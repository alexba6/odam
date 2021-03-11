## Getting Started

First set the environment variables:

````environment
NODE_ENV ( development or production )
PORT ( optional default 3000 )

DATABASE_URL ( exemple : mysql://user:pass@host/dbname )
DATABASE_DIALECT ( exemple : mysql )

MAIL_HOST ( mail host like smtp.gmail.com )
MAIL_PORT ( smtp port like 25, 587 )
MAIL_USER ( smtp login )
MAIL_PASSWORD= ( smtp pasword )

JWT_KEY ( jsonwebtoken key )
JWT_TIME ( jsonwebtoken time )

SITE_URL ( url of the site  )
SITE_NAME ( name of the site )
FULL_ADMIN ( email of the admin in json exemple ["user@domain.com"] )
````

Update the option in ````/server/config````  for your database and your smtp server.

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Deploy

Set environment to:
````environment
NODE_ENV=production
````

With docker:
```bash
docker-compose up -d
```

Or:

```bash
npm run build
npm run export 
npm start
```
