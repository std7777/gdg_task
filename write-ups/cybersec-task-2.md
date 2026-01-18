### Hidden Recipe

( i can see the secret_recipe but i cannot open it 😭  _...yet_ )

We first find the IP of the victim machine by a Nmap host discovery scan.

![alt text](image-7.png)

```
nmap -sn 172.16.222.190/21

Nmap scan report for 172.16.222.196
Host is up (0.00080s latency).
MAC Address: 08:00:27:6D:C8:67 (PCS Systemtechnik/Oracle VirtualBox virtual NIC)
```

The victim ip is 172.16.222.196. We proceed to perform a port scan 

![alt text](image-8.png)

21/tcp  open  ftp      vsftpd 3.0.5
22/tcp  open  ssh      OpenSSH 10.0p2 Debian 7 (protocol 2.0)
80/tcp  open  http     nginx
|_http-title: Site doesn't have a title (text/html; charset=utf-8).
443/tcp open  ssl/http nginx

the ports themselves dont bare any vulnerabilities.
We connect to the http port using the browser and find a food ordering portal and login and register endpoints.
We use gobuster to find exposed endpoints. 

![alt text](<Screenshot 2026-01-18 191255.png>)

![alt text](image-9.png)

going back from this page we land on the admin page.

![alt text](image-10.png)
![alt text](image-11.png)

the same page can be reached from with the actual admin email admin@foodify.com using the JWT_secret later discovered.
from here we can download log file.

the /logs endpoint had ssh of user deploy and password Spring2021!

```
2024-11-14T13:42:31Z INFO sshd[1234]: Accepted password for deploy from 192.168.1.10
2024-11-14T13:42:33Z INFO sshd[1234]: User deploy authenticated using password 'Spring2021!'
2024-11-14T13:42:40Z INFO ftpd[567]: FTP service listening on 0.0.0.0:21
```
but those didnt help get access, niether the user/pass of deploy in the orders.log file that we downloaded.

The log file we obtain also contained ftp user/pass of backup
```
2024-10-17T21:23:11Z INFO  ftpd[2077]: USER backup
2024-10-17T21:23:11Z INFO  ftpd[2077]: PASS oLd$bAcKuPsN@ThInGt@sEeHeRe
```
![alt text](image-12.png)

![alt text](image-13.png)

in the notes/laptop_refresh.txt file we find user/pass of intern. this gives us ssh access to server through intern user.


![alt text](image-14.png)

(i tried using id_rsa to login into other users by i was unsuccessful)

![alt text](image-19.png)

![alt text](image-15.png)

the secret_recipe is owned by root and intern isnt on the sudoer file. we look for other files that intern can read by the command

```
find / -type f -user intern 2>/dev/null
```

we find a few folders of the website in the opt folder. one of which is .env .
``` 
cat .env
DATABASE_URL=file:prisma/dev.db
JWT_SECRET="super-secret-dev-key"
```
We check the sqlite db and find emails of users.
![alt text](image-16.png)


--- Dumping table: User ---
(1, 'admin@foodify.com', '$2b$10$HzqFlFkAZy06NH9.eReUI.r44GI0Ys9xu55RHQqnVO7jL7InbMbrC', 1, '2026-01-05T19:13:52.470+00:00')
(2, 'Vihaan32.km@gmail.com', '$2b$10$r2sueVuX9hLrIMpNlq.8r.v97y9admAbkKOYzgsDjTUI7HAdZTgz6', 0, '2026-01-05T19:16:01.541+00:00')
(3, 'aarav.dev@gmail.com', '$2b$10$Th5OvYwSupbZBQXJFwACg.X5dhaPDRN2W6iW2AiBmabkh4XCPPjoG', 0, '2026-01-05T19:16:55.671+00:00')
(4, 'aayush@gmail.com', '$2b$10$04J5nxddBlKOb3qa5LWtaOUX8tlgmhegbRKR/tV3nH7R.d8uKLsU6', 0, '2026-01-05T21:11:50.313+00:00')
(5, 'fall', '$2b$10$sjPw.5TVMmuniHAEha.qPeXGrhTFG3ttIVLZfSVvFagq6XeXMTodS', 0, '2026-01-17T16:28:14.260+00:00')
(6, 'hell', '$2b$10$rLGdpsWGNKxVKUH3rt7Lj.TshfMWXijz/oZQdLIpyMuQpSwexOn5u', 0, '2026-01-17T17:26:17.287+00:00')
(7, 'john', '$2b$10$/6Fq7IPaIczFvdO9T0HaneyZJoKINToCW39FTLg3L/1oYM4yFWtOa', 0, '2026-01-17T17:32:50.762+00:00')

The jwt_secret can help us forge a acceptable cookie. 
![alt text](image-18.png)
![alt text](image-17.png)

---
i havent found anything beyond this point.