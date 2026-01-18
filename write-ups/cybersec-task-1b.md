### apple_pi3

(
    The binary uses fgets() to read user input into a buffer and passes it
    directly to printf() without a format string, resulting in a format
    string vulnerability. But this didnt help getting to the flag.

    i couldnt find out anything by giving various inputs to the running program niether by using the strings command or objdump -s -j .rodata
)

We use ghirda for static analysis.

the decompiled main function didn't have any line that indicated the prinitng of the string
```
You found the hidden treasure: %s
```
which was uncovered by the strings command.

![alt text](<images/Screenshot 2026-01-17 201208.png>)


This indicates that the string is used from some other part of the program .On clicking the string in ghirda we get the def_nothing_important method that construct an byte array on the stack and decodes it using XOR. 

![alt text](<images/Screenshot 2026-01-17 200608.png>)
![alt text](<images/Screenshot 2026-01-17 200520.png>)

We can uncover the final value of local_26 using CyberChef. 
A recipe of Hex from and XOR with key=5 will give the decoded flag.

![alt text](<images/Screenshot 2026-01-17 202152.png>)

flag = gdg{P1E_3xpl01ted_lol}
