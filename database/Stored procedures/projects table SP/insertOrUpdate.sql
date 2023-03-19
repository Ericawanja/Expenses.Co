create
or alter procedure insertOrUpdateProject(
    @id varchar(100),
    @clientId varchar(100),
    @projectTitle varchar(100),
    @projectType varchar(100),
    @assigned_on Date,
    @due_on Date,
    @delivered Bit = 0
) AS BEGIN Declare @exists Bit
select
    @exists = count(id)
from
    projects
where
    id = @id if @exists = 0 Begin
insert into
    projects(
        id,
        clientId,
        projectTitle,
        projectType,
        assigned_on,
        due_on
    )
values
    (
        @id,
        @clientId,
        @projectTitle,
        @projectType,
        @assigned_on,
        @due_on
    )
End
ELSE BEGIN
update
    projects
set
    clientId = @clientId,
    projectTitle = @projectTitle,
    projectType = @projectType,
    assigned_on = Cast (@assigned_on as date),
    due_on = cast(@due_on as date) where id= @id
END
End