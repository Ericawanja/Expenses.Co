create
or alter procedure insertResetQUeue(
    @email varchar(100),
    @token varchar(300)
) AS BEGIN
insert into
    resetQueue (email, token, isSent)
values
    (@email, @token, 0)
END
select
    *
from
    resetQueue