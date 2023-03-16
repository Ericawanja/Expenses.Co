create
or alter Procedure removeClient(@id varchar(100)) AS BEGIN
update
    clients
set
    isDeleted = 1
where
    id = @id
End