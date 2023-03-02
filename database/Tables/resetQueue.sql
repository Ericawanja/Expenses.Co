create table resetQueue(
    email varchar(100), 
    token varchar(300), 
    isSent Bit default 0
)