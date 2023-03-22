create
or alter procedure getOneProject(@id varchar(100)) AS BEGIN
select
     projects.id as id,
    clientId,
    clients.name as clientname,
    projectTitle,
    projectType,
    assigned_on,
    due_on,
    isDelivered,
    budget,
    isPaid
from
    projects
     inner Join clients on clients.id = clientId
where
    projects.isDeleted = 0
    AND projects.id = @id
end