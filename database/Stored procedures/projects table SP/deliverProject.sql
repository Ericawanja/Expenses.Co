create
or alter procedure deliverProject(@id varchar(100)) AS Begin
update
    projects
set
    delivered = 1
where
    id = @id
End