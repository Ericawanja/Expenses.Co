create table projects(
    id varchar(100) primary key,
    clientId varchar(100) Foreign key(clientId) references clients(id),
    projectTitle varchar(200) Not null,
    projectType varchar(200) Not Null,
    assigned_on Date Not Null,
    due_on Date Not Null,
    budget Money,
    isDelivered Bit default 0,
    isPaid Bit default 0,
    isDeleted Bit default 0
)