create
or alter procedure getOneClient(
@id varchar(100) ="_", 
@email varchar(100) = "_"
) AS BEGIN select

    id,
    name,
    email,
    location
from
    clients
where
    id = @id  and isDeleted = 0 OR email= @email
    and isDeleted = 0

END