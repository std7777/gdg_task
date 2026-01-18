### 3 Levels

## part 1

<img width="960" height="1140" alt="Screenshot 2026-01-15 165251" src="https://github.com/user-attachments/assets/81c57225-298d-4fa1-813f-9153ff2b304e" />
<img width="1447" height="850" alt="Screenshot 2026-01-15 165033" src="https://github.com/user-attachments/assets/0d061078-6cd1-40dc-9cb1-47a6bafef2b9" />
<img width="1447" height="850" alt="Screenshot 2026-01-15 164949" src="https://github.com/user-attachments/assets/d6ba8d53-7c51-48d7-86db-94330fe1eb98" />
flag part1 = gdg{sw1ss


## part 3

there is open source npm package to scan qr codes from an image

https://github.com/victorperin/qr-scanner-cli

a javascript program was written to scan all the qrs and group them according to the string they bare. 

the output was stored in result.txt file.

```
node scan-folder.js > result.txt
```

the program is present in qr-code folder.

we find a unique string which is base64 coded: PDwtLS0tcGFydDM9Z2cxb2x9LS0tLT4+

```
echo "PDwtLS0tcGFydDM9Z2cxb2x9LS0tLT4+" | base64 -d
<!---part3=gg1ol}--->
```

flag part3 = gg1ol}
