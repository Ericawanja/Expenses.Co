create
or alter Procedure getAllProjects AS BEGIN
select
    projects.id as id,
    clientId,
    clients.name as clientname,
    projectTitle,
    projectType,
    assigned_on,
    due_on,
    delivered
from
    projects
    inner Join clients on clients.id = clientId
where
    projects.isDeleted = 0
END