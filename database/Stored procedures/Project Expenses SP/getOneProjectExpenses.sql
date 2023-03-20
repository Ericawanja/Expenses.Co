create
or alter procedure getOneProjectExpense
(@id varchar(100))
 AS BEGIN
select
    id,
    projectId,
    expenditure,
    budget,
    isPaid
from
    expenses
where
    isDeleted = 0 AND id = @id
END