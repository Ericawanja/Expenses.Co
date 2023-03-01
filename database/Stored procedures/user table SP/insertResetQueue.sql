create
or alter procedure insertResetQUeue(@email varchar(100)) AS BEGIN
insert into
    resetQueue
values
(@email, 0)
END