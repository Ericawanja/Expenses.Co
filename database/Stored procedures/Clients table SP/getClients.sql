create
or alter procedure getClients(@id varchar(100) = 0) AS BEGIN if @id = 0 BEGIN
select
    id,
    name,
    email,
    location
from
    clients
where
    isDeleted = 0
END
Else BEGIN
select
    id,
    name,
    email,
    location
from
    clients
where
    id = @id
    and isDeleted = 0
END
END