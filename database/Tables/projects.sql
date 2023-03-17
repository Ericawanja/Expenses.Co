create table projects(
    id varchar(100) primary key,
    client varchar(100) Foreign key(id) references clients,
    name varchar(200) Not null,
    projectType varchar(200) Not Null,
    assigned_on Date Not Null,
    due_on Date Not Null,
    delivered Bit default 0,
    isDeleted Bit default 0
)