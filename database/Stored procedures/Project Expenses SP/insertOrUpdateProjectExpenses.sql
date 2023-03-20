create
or alter procedure insertOrUpdateProjectExpenses (
    @id varchar(100),
    @projectId varchar(100),
    @expenditure Money,
    @budget Money,
    @isPaid Bit = 0
) AS BEGIN Declare @exist BIT
select
    @exist = count(id)
from
    expenses
where
    id = @id if @exist = 0 BEGIN
insert into
    expenses (id, projectId, expenditure, budget, isPaid)
values
    (@id, @projectId, @expenditure, @budget, @isPaid)
End
ELSE BEGIN
update
    expenses
set
    
    projectId = @projectId,
    expenditure = @expenditure,
    budget = @budget,
    isPaid = @isPaid
End
END