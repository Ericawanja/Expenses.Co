create
or alter procedure getFromResetQueue(@email varchar(100)) AS BEGIN
select
    *
from 
resetQueue
where
    email = @email

END