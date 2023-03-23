create
or alter procedure getParticularProjectExpenses(@projectId varchar(100)) AS BEGIN
select
    id,
    projectId,
    expenseTitle,
    expenseDescription
from
    expenses
where
    isDeleted = 0
    AND projectId = @projectId
END