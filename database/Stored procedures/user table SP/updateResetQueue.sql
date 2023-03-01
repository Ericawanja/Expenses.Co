create
or alter procedure updateResetQUeue(@email varchar(100)) AS BEGIN
update
    resetQueue
set
    isSent = 1
where
    email = @email
END