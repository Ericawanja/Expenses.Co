create
or alter procedure removeProject(@id varchar(100)) AS BEGIN
update
    projects
set
    isDeleted = 1
where
    id = @id
END