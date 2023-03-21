create
or alter procedure markProjectAsPaid (@projectId varchar(100)) AS BEGIN Declare @exists BIT

update
    expenses
set
    isPaid = 1
where
    projectId = @projectId
END