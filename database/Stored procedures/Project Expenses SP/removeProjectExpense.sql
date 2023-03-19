create
or alter procedure removeProjectExpense(@id varchar(100)) AS BEGIN
update
    expenses
set
    isDeleted = 1
where
    id = @id
END