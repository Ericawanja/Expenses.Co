create
or alter procedure insertOrUpdateClient(
    @id varchar(100),
    @name varchar(100),
    @email varchar(150),
    @location varchar(100)
) AS BEGIN Declare @exists Bit;

select
    @exists = count(id)
from
    clients
where
    id = @id if @exists = 0 Begin
insert into
    clients (id, name, email, location)
values
    (@id, @name, @email, @location)
END
Else BEGIN
update
    clients
set
    email = @email,
    name = @name,
    location = @location
where
    id = @id
End
END