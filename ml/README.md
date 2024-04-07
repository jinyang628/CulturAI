## Getting Started!

### Create .env file

Duplicate the contents of `.env.example` and name it `.env` 


### Create a virtual environment if you have yet to.

```
python3 -m venv venv
```

### Activate virtual environment

#### MAC users

```
source venv/bin/activate
```

#### Windows users

```
venv\Scripts\activate
```

### Install the latest dependencies used by others

```
pip install -r requirements.txt
```

### Start the server

```
python app.py
```

## Before pushing

### Update requirements.txt with the latest dependencies you installed

```
pip freeze > requirements.txt
```

## Common problems 

### All of the packages appear to be missing in the IDE although you have installed it

This is because ur interpreter is not set to the correct virtual environment.
- Type `which python` in the terminal
- Copy the output
- Ctrl, Shift, P to open interpreter selection panel
- Copy and paste the path into the selection menu
