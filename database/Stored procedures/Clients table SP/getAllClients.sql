create
or alter procedure getAllClients AS BEGIN
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