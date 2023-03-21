create
or alter procedure generateAllInvoices AS BEGIN
select
    p.id as projectId,
    p.projectTitle,
    c.email as clientContacts,
    budget
from
    projects p
    inner Join clients c on p.clientId = c.id
    inner join expenses e on p.id = e.projectId
where
    p.delivered = 1
    AND p.isDeleted = 0
    AND e.isPaid = 0
END