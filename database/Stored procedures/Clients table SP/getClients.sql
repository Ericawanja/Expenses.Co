create
or alter procedure getClients(
@id varchar(100) = '_',
@email varchar(100) = '_'
) AS BEGIN select

    id,
    name,
    email,
    location
from
    clients
where
    id = @id OR email= @email
    and isDeleted = 0

END