create
or alter procedure insertOrUpdateProjectExpenses (
    @id varchar(100),
    @projectId varchar(100),
    @expenseTitle Money,
    @expenseDescription varchar(400)
) AS BEGIN Declare @exist BIT
select
    @exist = count(id)
from
    expenses
where
    id = @id if @exist = 0 BEGIN
insert into
    expenses (id, projectId, expenseTitle, expenseDescription)
values
    (
        @id,
        @projectId,
        @expenseTitle,
        @expenseDescription
    )
End
ELSE BEGIN
update
    expenses
set
    projectId = @projectId,
    expenseTitle = @expenseTitle,
    expenseDescription = @expenseDescription
End
END