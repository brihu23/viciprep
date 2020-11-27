from django import template
register = template.Library()

@register.filter
def cut(value):
	value = value.replace(" ", "-")
	return value.replace(",-", " ")
