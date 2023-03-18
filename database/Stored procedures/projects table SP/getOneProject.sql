create
or alter procedure getOneProject(@id varchar(100)) AS BEGIN
select
    id,
    clientId,
    projectTitle,
    projectType,
    assigned_on,
    due_on,
    delivered
from
    projects
where
    isDeleted = 0
    AND id = @id
end