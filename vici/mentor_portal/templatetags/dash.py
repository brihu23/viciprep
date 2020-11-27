from django import template
register = template.Library()

@register.filter
def dash(value):
	return value.replace(" ", "-")
	
