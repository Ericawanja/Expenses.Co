create
or alter Procedure getAllProjects AS BEGIN
select
    id,
    clientId,
    clients.name as clientname,
    projectTitle,
    projectType,
    assigned_on,
    due_on,
    delivered
from
    projects
    inner Join clients on clients.id = clientdId
where
    isDeleted = 0
END