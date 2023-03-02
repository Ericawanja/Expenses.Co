create
or alter procedure removeFromResetQueue(@email varchar(100)) AS BEGIN
delete from
    resetQueue
where
    email = @email
END