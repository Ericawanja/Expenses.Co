create
or alter procedure getAllProjectsExpenses AS BEGIN
select
    id,
    projectId,
    expenditure,
    budget,
    isPaid
from
    expenses
where
    isDeleted = 0
END