CREATE TABLE account(
	id VARCHAR(32)
		NOT NULL,
	CONSTRAINT unique_account_id
		UNIQUE(id),
	CONSTRAINT pk_account
		PRIMARY KEY(id),
	email VARCHAR
		NOT NULL,
	CONSTRAINT unique_account_email
		UNIQUE(email),
	password VARCHAR
		NOT NULL,
	created_at TIMESTAMP WITH TIME ZONE
		NOT NULL,
	updated_at TIMESTAMP WITH TIME ZONE
		NOT NULL
);

CREATE TABLE profile(
	id VARCHAR(32)
		NOT NULL,
	CONSTRAINT unique_profile_id
		UNIQUE(id),
	CONSTRAINT pk_profile
		PRIMARY KEY(id),
	name VARCHAR
		NOT NULL,
	account_id VARCHAR(32)
		NOT NULL,
	CONSTRAINT fk_profile_account
		FOREIGN KEY(account_id)
		REFERENCES account(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	created_at TIMESTAMP WITH TIME ZONE
		NOT NULL,
	updated_at TIMESTAMP WITH TIME ZONE
		NOT NULL
);

CREATE TABLE profile_contact(
	id VARCHAR(32)
		NOT NULL,
	CONSTRAINT unique_profile_contact_id
		UNIQUE(id),
	CONSTRAINT pk_profile_contact
		PRIMARY KEY(id),
	plataform VARCHAR
		NOT NULL,
	contact VARCHAR
		NOT NULL,
	profile_id VARCHAR(32)
		NOT NULL,
	CONSTRAINT fk_profile_contact_profile
		FOREIGN KEY(profile_id)
		REFERENCES profile(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	created_at TIMESTAMP WITH TIME ZONE
		NOT NULL,
	updated_at TIMESTAMP WITH TIME ZONE
		NOT NULL
);