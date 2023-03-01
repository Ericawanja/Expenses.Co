create
or alter procedure removeEmail(@email varchar(100)) AS BEGIN
delete from
    resetQueue
where
    email = @email
END